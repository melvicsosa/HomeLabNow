require('dotenv').config();
const fs = require('fs');
const { google } = require('googleapis');

// Helper function to format view counts
function formatViewCount(viewCount) {
    const num = parseInt(viewCount);
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
}

async function fetchYouTubeData() {
    const youtube = google.youtube({ version: 'v3', auth: process.env.YOUTUBE_API_KEY });

    // 1) Channel stats
    const [channelResp] = await Promise.all([
        youtube.channels.list({
            part: ['snippet', 'statistics'],
            id: [process.env.YOUTUBE_CHANNEL_ID]
        })
    ]);
    const channel = channelResp.data.items[0];

    // 2) Latest 8 videos
    const videosResp = await youtube.search.list({
        part: ['snippet'],
        channelId: process.env.YOUTUBE_CHANNEL_ID,
        order: 'date',
        maxResults: 8,
        type: ['video']
    });

    // 3) Get video statistics (views, likes, etc.) for each video
    const videoIds = videosResp.data.items.map(v => v.id.videoId);
    const videoStatsResp = await youtube.videos.list({
        part: ['statistics'],
        id: videoIds
    });

    // Create a map of video ID to stats for easy lookup
    const videoStatsMap = {};
    videoStatsResp.data.items.forEach(video => {
        videoStatsMap[video.id] = video.statistics;
    });

    // 4) Fetch playlists for selective updates (covers remain manual)
    const playlistsResp = await youtube.playlists.list({
        part: ['snippet', 'contentDetails'],
        channelId: process.env.YOUTUBE_CHANNEL_ID,
        maxResults: 50 // Get more playlists so user can select from them
    });

    // Create a map of playlist data for selective updates
    const playlistDataMap = {};
    playlistsResp.data.items.forEach(playlist => {
        playlistDataMap[playlist.id] = {
            title: playlist.snippet.title,
            url: `https://www.youtube.com/playlist?list=${playlist.id}`,
            count: playlist.contentDetails.itemCount.toString()
        };
    });

    // 5) Fetch videos from Windows Server 2022 playlist for the featured-gaming section
    const ws2022PlaylistId = 'PLixu9Vf-7p-N202nUeO3LvLbtGA8T0rnn'; // Curso Completo de Windows Server 2022: Instalación y Administración
    const ws2022VideosResp = await youtube.playlistItems.list({
        part: ['snippet'],
        playlistId: ws2022PlaylistId,
        maxResults: 50 // Get more to select last 8
    });

    // Get video statistics for Windows Server 2022 videos
    const ws2022VideoIds = ws2022VideosResp.data.items.map(item => item.snippet.resourceId.videoId);
    const ws2022VideoStatsResp = await youtube.videos.list({
        part: ['statistics'],
        id: ws2022VideoIds
    });

    // Create stats map for Windows Server 2022 videos
    const ws2022VideoStatsMap = {};
    ws2022VideoStatsResp.data.items.forEach(video => {
        ws2022VideoStatsMap[video.id] = video.statistics;
    });

    // Format Windows Server 2022 videos and take last 8
    const ws2022Videos = ws2022VideosResp.data.items
        .slice(-8) // Take last 8 videos
        .map(item => ({
            url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
            title: item.snippet.title,
            thumb: {
                lg: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
                md: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default.url
            },
            meta: {
                views: formatViewCount(ws2022VideoStatsMap[item.snippet.resourceId.videoId]?.viewCount || '0'),
                date: new Date(item.snippet.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                })
            }
        }));

    // 4) Build combined JSON
    const output = {
        channel: {
            id: channel.id,
            name: channel.snippet.title,
            handle: channel.snippet.customUrl || '',
            subscriberCount: Number(channel.statistics.subscriberCount),
            thumbnailUrl: channel.snippet.thumbnails.high.url
        },
        videos: {
            feed: videosResp.data.items.map(v => ({
                title: v.snippet.title,
                url: `https://www.youtube.com/watch?v=${v.id.videoId}`,
                thumb: { lg: v.snippet.thumbnails.high.url },
                publishedAt: v.snippet.publishedAt.split('T')[0]
            }))
        }
    };

    // 6) Update yt1.json with real YouTube data
    const yt1Path = 'source/data/yt1.json';
    let yt1Data = {};
    if (fs.existsSync(yt1Path)) {
        yt1Data = JSON.parse(fs.readFileSync(yt1Path, 'utf-8'));
    }

    // 6) Fetch videos from "Destacados" playlist for the featured videos section
    const destacadosPlaylistId = 'PLixu9Vf-7p-MF2z3Byp92k9Jp0T7NgNou'; // Destacados
    const destacadosVideosResp = await youtube.playlistItems.list({
        part: ['snippet'],
        playlistId: destacadosPlaylistId,
        maxResults: 50 // Get more to select last 8
    });

    // Get video statistics for Destacados videos
    const destacadosVideoIds = destacadosVideosResp.data.items.map(item => item.snippet.resourceId.videoId);
    const destacadosVideoStatsResp = await youtube.videos.list({
        part: ['statistics'],
        id: destacadosVideoIds
    });

    // Create stats map for Destacados videos
    const destacadosVideoStatsMap = {};
    destacadosVideoStatsResp.data.items.forEach(video => {
        destacadosVideoStatsMap[video.id] = video.statistics;
    });

    // Format Destacados videos and take last 8
    const destacadosVideos = destacadosVideosResp.data.items
        .slice(-8) // Take last 8 videos
        .map(item => ({
            url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
            title: item.snippet.title,
            thumb: {
                md: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default.url,
                lg: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium.url
            },
            meta: {
                views: formatViewCount(destacadosVideoStatsMap[item.snippet.resourceId.videoId]?.viewCount || '0'),
                date: new Date(item.snippet.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                })
            }
        }));

    // Update the featured videos section with Destacados playlist videos
    if (!yt1Data.videos) yt1Data.videos = {};
    yt1Data.videos.featured = destacadosVideos;
    
    // Update the feed section with latest uploads from channel
    yt1Data.videos.feed = videosResp.data.items.map(v => ({
        title: v.snippet.title,
        url: `https://www.youtube.com/watch?v=${v.id.videoId}`,
        thumb: {
            md: v.snippet.thumbnails.medium?.url || v.snippet.thumbnails.default.url,
            lg: v.snippet.thumbnails.high?.url || v.snippet.thumbnails.medium.url
        },
        meta: {
            views: formatViewCount(videoStatsMap[v.id.videoId]?.viewCount || '0'),
            date: new Date(v.snippet.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            })
        },
        publishedAt: v.snippet.publishedAt.split('T')[0]
    }));

    // Add subscriber count to yt1Data for template access
    if (!yt1Data.channel) yt1Data.channel = {};
    yt1Data.channel.subscriberCount = Number(channel.statistics.subscriberCount);
    yt1Data.channel.name = channel.snippet.title;
    yt1Data.channel.handle = channel.snippet.customUrl || '';

    console.log(`🔍 Destacados playlist has ${destacadosVideosResp.data.items.length} videos, using ${yt1Data.videos.featured.length} for featured`);
    console.log(`🔍 Latest uploads has ${videosResp.data.items.length} videos, using ${yt1Data.videos.feed.length} for feed`);
    console.log(`🔍 Windows Server 2022 playlist has ${ws2022VideosResp.data.items.length} videos, using ${yt1Data.videos['featured-gaming'].length} for featured-gaming`);
    console.log(`📊 Updated subscriber count: ${yt1Data.channel.subscriberCount.toLocaleString()}`);

    // Update the featured-gaming section with Windows Server 2022 videos
    yt1Data.videos['featured-gaming'] = ws2022Videos;
    console.log(`🔍 Windows Server 2022 playlist has ${ws2022VideosResp.data.items.length} videos, using ${ws2022Videos.length} for featured-gaming`);

    // Update existing playlists selectively (preserve covers, update data)
    // Define which playlists to keep/update (user's selected playlists)
    const selectedPlaylistIds = [
        'PLixu9Vf-7p-N202nUeO3LvLbtGA8T0rnn', // Curso Completo de Windows Server 2022: Instalación y Administración
        'PLixu9Vf-7p-N5EJccMbU0Z7ptjSn0Ba8P', // Aprendiendo Azure: Guías paso a paso
        'PLixu9Vf-7p-PPP1PE3daF94iuUDlzSoHz', // Curso práctico: Desplegando Sistemas Operativos con Windows Deployment Service
        'PLixu9Vf-7p-PkhG85CxT-eHzgDYDWgnk4', // Aprendiendo pfSense
        'PLixu9Vf-7p-N96T9_qPOMjbydKnJ_-gx9', // Remote Desktop Services (RDS)
        'PLixu9Vf-7p-MfYuM-HsGwnCdFIk0wdqxd'  // Curso de Hyper-V Server
    ];

    // Only update playlists if we have existing ones and selected IDs
    if (yt1Data.playlists && selectedPlaylistIds.length > 0) {
        // Update only the selected playlists, preserving existing covers
        yt1Data.playlists = yt1Data.playlists.map((existingPlaylist, index) => {
            if (index < selectedPlaylistIds.length) {
                const playlistId = selectedPlaylistIds[index];
                const youtubeData = playlistDataMap[playlistId];
                if (youtubeData) {
                    return {
                        ...existingPlaylist, // Keep existing cover and other properties
                        title: youtubeData.title,
                        url: youtubeData.url,
                        count: youtubeData.count
                    };
                }
            }
            return existingPlaylist; // Keep unchanged if no match
        });
    }

    // Also update site-data.json for other uses
    const basePath = 'source/data/site-data.json';
    let base = {};
    if (fs.existsSync(basePath)) {
        base = JSON.parse(fs.readFileSync(basePath, 'utf-8'));
    }
    base.channel = output.channel;
    base.videos = output.videos;
    base.playlistDataMap = output.playlistDataMap; // Store playlist data for reference

    fs.writeFileSync(yt1Path, JSON.stringify(yt1Data, null, 2));
    fs.writeFileSync(basePath, JSON.stringify(base, null, 2));
    console.log('✅ yt1.json and site-data.json updated with YouTube info.');
    console.log(`📺 Updated featured videos section with ${destacadosVideos.length} videos from Destacados playlist`);
    console.log(`🎬 Fetched ${Object.keys(playlistDataMap).length} playlists for selective updates`);
    console.log(`📋 Available playlist IDs:`);
    Object.entries(playlistDataMap).forEach(([id, data]) => {
        console.log(`   ${id}: "${data.title}" (${data.count} videos)`);
    });
}

fetchYouTubeData().catch(err => {
    console.error('⚠️  Error fetching YouTube data:', err);
    process.exit(1);
});
