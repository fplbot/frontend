import React from 'react';

function AddToSlackForm() {
  return (
    <div className="bg-gray-300">

      <div className="relative container mx-auto pb-24 pb-4 md:pb-20 px-8 text-center">

        <div className="flex justify-center">
          <div className="max-w-xs">

            <p className="block uppercase tracking-wide text-fpl-purple font-bold mb-4">Install fplbot</p>

            <InputField
              name="slack-channel"
              label="Slack channel"
              placeHolder="#channel"
            />
            <InputField
              name="league-id"
              label="Fantasy league id"
              placeHolder="010203"
            />
            <div className="container mx-auto w-40 pt-8">
              <img src="https://platform.slack-edge.com/img/add_to_slack@2x.png" alt="Add to slack button" />
            </div>
          </div>

          <img src="/logo.svg" className="w-48 mx-12 hidden md:block" />

        </div>

      </div>
    </div>
  );
}

interface InputFieldProps {
  name: string;
  placeHolder: string
  label: string;
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
        name={props.name}
        type="text"
        placeholder={props.placeHolder}
        aria-label={props.label} />
    </div>
  );
}

export default AddToSlackForm;