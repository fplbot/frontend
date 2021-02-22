import { FPLBOT_APP_URL } from "../utils/envconfig";
import Button from "./Button";

export default function Header() {
    return (
      <div className="flex justify-between px-8 py-6">
        <a href="/" className="text-2xl font-bold text-fpl-purple">
          fplbot.app
        </a>
        <Button onClick={goToInstall} color="GREEN">
          Install fplbot
        </Button>
      </div>
    );
  
    function goToInstall() {
      window.location.href = FPLBOT_APP_URL + "/#add-to-slack";
    }
  };