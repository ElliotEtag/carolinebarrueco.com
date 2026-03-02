// Caroline Barrueco — Portfolio
// YouTube video background + WebGL ripple initialization

(() => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;

  // =========================================================================
  // YouTube Video Background
  // =========================================================================

  if (isMobile) {
    const videoBg = document.querySelector('.video-background');
    if (videoBg) videoBg.classList.add('mobile-fallback');
  }

  // Load YouTube IFrame API
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(tag, firstScript);

  let player;

  window.onYouTubeIframeAPIReady = () => {
    if (isMobile) return;

    player = new YT.Player('yt-player', {
      videoId: 'QgwgcX3w7Qo',
      playerVars: {
        autoplay: 1,
        mute: 1,
        controls: 0,
        showinfo: 0,
        rel: 0,
        loop: 1,
        playlist: 'QgwgcX3w7Qo',
        modestbranding: 1,
        playsinline: 1,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        origin: window.location.origin
      },
      events: {
        onReady: (e) => {
          e.target.mute();
          e.target.playVideo();
        },
        onStateChange: (e) => {
          if (e.data === YT.PlayerState.ENDED) {
            player.seekTo(0);
            player.playVideo();
          }
        }
      }
    });
  };

  // =========================================================================
  // WebGL Ripple Effect
  // =========================================================================

  const initRipple = () => {
    const rippleEl = document.getElementById('ripple-container');
    if (!rippleEl) return;

    // Check if jQuery ripples is available
    if (typeof jQuery === 'undefined' || typeof jQuery.fn.ripples === 'undefined') return;

    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    try {
      jQuery('#ripple-container').ripples({
        resolution: 512,
        dropRadius: 20,
        perturbance: 0.04,
        interactive: true
      });

      // Ambient ripples — subtle automatic drops
      setInterval(() => {
        const x = Math.random() * rippleEl.offsetWidth;
        const y = Math.random() * rippleEl.offsetHeight;
        const dropRadius = 15 + Math.random() * 10;
        const strength = 0.01 + Math.random() * 0.03;
        jQuery('#ripple-container').ripples('drop', x, y, dropRadius, strength);
      }, 2500);
    } catch (e) {
      // Graceful degradation — static background image still shows
    }
  };

  // Initialize ripple when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRipple);
  } else {
    initRipple();
  }
})();
