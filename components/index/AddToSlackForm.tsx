import React, { ChangeEvent } from 'react';
import { getRedirectUri, validateLeagueId } from '../../services/signup';
import useDebounce from '../../utils/useDebounce';

function AddToSlackForm() {

  const [message, setMessage] = React.useState<string | undefined>(undefined);

  const [leagueId, setLeagueId] = React.useState<string>("");
  const leagueIdDebounced = useDebounce(leagueId, 300);

  const [channel, setChannel] = React.useState<string>("");

  React.useEffect(() => {
    if (leagueId === "") {
      setMessage(undefined);
      return;
    }

    validateLeagueId(leagueId).then(res => {
      if (res.type === 'NOT_FOUND') {
        setMessage("Could not find league 😕 Only classic leagues are currently supported");
      } else {
        setMessage(`Found slack league ${res.leagueName}`);
      }
    });


  }, [leagueIdDebounced]);

  return (
    <div id="add-to-slack" className="bg-gray-300">

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
              type="number"
              onChange={handleLeagueChange}
              name="league-id"
              label="Fantasy league id"
              placeHolder="010203"
            />
            <div className="w-full p-2 mt-6 text-fpl-purple">
              {message}
            </div>
            <div className="container mx-auto w-40 pt-8">
              <button className="rounded shadow-sm hover:shadow" onClick={onSubmit}>
                <img src="https://platform.slack-edge.com/img/add_to_slack@2x.png" alt="Add to slack button" />
              </button>
            </div>
          </div>

          <img src="/logo.svg" className="w-48 mx-12 hidden md:block" />

        </div>

        <p className="mt-10 text-gray-600 text-sm break-words">
          You can find your leagueId in the url of your fantasy premier leage page: https://fantasy.premierleague.com/leagues/<b>leagueid</b>/standings
        </p>

      </div>
    </div>
  );

  function handleLeagueChange(e: ChangeEvent<HTMLInputElement>) {
    setMessage(undefined);
    setLeagueId(e.target.value);
  };

  function handleChannelChange(e: ChangeEvent<HTMLInputElement>) {
    setChannel(e.target.value);
  };

  function onSubmit() {
    if (leagueId === "" || channel === "") {
      setMessage("Please fill in a league id and a channel");
      return;
    }
    getRedirectUri(channel, parseInt(leagueId, 10))
      .then((res) => {
        if (res.type === 'SUCCESS') {
          window.location.href = res.redirectUri;
        }
        else {
          setMessage("Failed to set up bot 😕 Check your input.");
        }
      });
  }
}

interface InputFieldProps {
  name: string;
  placeHolder: string
  label: string;
  value: string;
  type?: "number" | "text";
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
        type={props.type}
        onChange={props.onChange}
        name={props.name}
        placeholder={props.placeHolder}
        aria-label={props.label} />
    </div>
  );
}

export default AddToSlackForm;