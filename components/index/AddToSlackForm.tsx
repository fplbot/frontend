import React from 'react';
import { getRedirectUri } from '../../services/signup';

function AddToSlackForm() {

  return (
    <div id="add-to-slack" className="pt-10">

      <div className="relative container mx-auto pb-24 md:pb-20 px-8 text-center">

        <div className="flex justify-center">
          <div className="max-w-xs">

            <p className="block uppercase tracking-wide text-fpl-purple font-bold mb-4">Install fplbot</p>

            <div className="container mx-auto w-40 pt-8">
              <button className="rounded shadow-sm hover:shadow" onClick={onSubmit}>
                <img src="https://platform.slack-edge.com/img/add_to_slack@2x.png" alt="Add to slack button" />
              </button>
            </div>
          </div>

          <img src="/logo.svg" className="w-48 mx-12 hidden md:block" alt="premier league logo" />

        </div>

      </div>
    </div>
  );


  function onSubmit() {

    getRedirectUri()
      .then((res) => {
        if (res.type === 'SUCCESS') {
          window.location.href = res.redirectUri;
        }
      });
  }
}

export default AddToSlackForm;
