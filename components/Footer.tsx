import React from 'react';

function Footer() {
  return (
    <div className="bg-fpl-pink text-white px-16 pt-12 pb-6">
      <div className="flex flex-col items-center">
        <h4 className="text-lg font-bold mb-2">Love fplbot?</h4>
        <ul className="leading-relaxed ">
          <li>💚 Sponsor us on patreon</li>
          <li>💚 Follow us on <a href="https://twitter.com/fplbotapp" className="underline">twitter</a></li>
          <li>💚 Join our <a href="https://join.slack.com/t/fplbot/shared_invite/zt-hevkzs43-UJjYEgbfwOSxBDHFBuBNMQ" className="underline">slack workspace</a></li>
        </ul>
      </div>
      <p className="text-gray-200 text-center font text-xs mt-8">
        @fplbot is an open source project made by <a href="https://www.blank.no/" className="underline">Blank</a>.
          The code is available on <a href="https://github.com/fplbot" className="underline">github</a>.
      </p>
    </div>
  );
}

export default Footer;