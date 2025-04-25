document.addEventListener('DOMContentLoaded', function() {
  const cookieConsent = document.getElementById('cookie-consent');
  const acceptButton = document.getElementById('cookie-accept');
  const declineButton = document.getElementById('cookie-decline');
  const analyticsId = cookieConsent.getAttribute('data-analytics-id');
  
  // Check if user has already made a choice
  const consentChoice = getCookie('analytics-consent');
  
  if (consentChoice === '') {
    // No choice made yet, show the banner
    cookieConsent.style.display = 'block';
  } else if (consentChoice === 'accepted') {
    // User accepted, enable analytics
    enableAnalytics(analyticsId);
  }
  
  // Handle accept button click
  acceptButton.addEventListener('click', function() {
    setCookie('analytics-consent', 'accepted', 365);
    cookieConsent.style.display = 'none';
    enableAnalytics(analyticsId);
  });
  
  // Handle decline button click
  declineButton.addEventListener('click', function() {
    setCookie('analytics-consent', 'declined', 365);
    cookieConsent.style.display = 'none';
  });
  
  // Helper to set cookies
  function setCookie(name, value, days) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  }
  
  // Helper to get cookies
  function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return '';
  }
  
  // Function to enable analytics
  function enableAnalytics(id) {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', id, { 'anonymize_ip': true });
  }
});
