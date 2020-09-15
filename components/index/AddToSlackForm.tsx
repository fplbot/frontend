import React, { ChangeEvent } from 'react';
import { getRedirectStatus } from 'next/dist/lib/check-custom-routes';
import { getRedirectUri } from '../../services/signup';

function AddToSlackForm() {

  const [leagueId, setLeagueId] = React.useState<string>("");
  const [channel, setChannel] = React.useState<string>("");

  return (
    <div className="bg-gray-300">

      <div className="relative container mx-auto pb-24 pb-4 md:pb-20 px-8 text-center">

        <div className="flex justify-center">
          <div className="max-w-xs">

            <p className="block uppercase tracking-wide text-fpl-purple font-bold mb-4">Install fplbot</p>

            <InputField
              value={channel}
              onChange={handleChannelChange}
              name="slack-channel"
              label="Slack channel"
              placeHolder="#channel"
            />
            <InputField
              value={leagueId}
              onChange={handleLeagueChange}
              name="league-id"
              label="Fantasy league id"
              placeHolder="010203"
            />
            <div className="container mx-auto w-40 pt-8">
              <button className="rounded shadow-sm hover:shadow" onClick={onSubmit}>
                <img src="https://platform.slack-edge.com/img/add_to_slack@2x.png" alt="Add to slack button" />
              </button>
            </div>
          </div>

          <img src="/logo.svg" className="w-48 mx-12 hidden md:block" />

        </div>

      </div>
    </div>
  );

  function handleLeagueChange(e: ChangeEvent<HTMLInputElement>) {
    setLeagueId(e.target.value);
  };

  function handleChannelChange(e: ChangeEvent<HTMLInputElement>) {
    setChannel(e.target.value);
  };

  function onSubmit() {
    getRedirectUri(channel, leagueId).then((res) => console.log(res));
  }
}

interface InputFieldProps {
  name: string;
  placeHolder: string
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function InputField(props: InputFieldProps) {
  return (
    <div className="grid grid-cols-3 gap-4 border-b-2 border-fpl-purple py-1 mb-2">
      <label
        htmlFor={props.name}
        className="col-span-1 block uppercase tracking-wide text-fpl-purple text-xs font-bold mb-2">
        {props.label}
      </label>
      <input
        className="col-span-2 appearance-none bg-transparent border-none w-full text-fpl-purple leading-tight focus:outline-none"
        value={props.value}
        onChange={props.onChange}
        name={props.name}
        type="text"
        placeholder={props.placeHolder}
        aria-label={props.label} />
    </div>
  );
}

export default AddToSlackForm;