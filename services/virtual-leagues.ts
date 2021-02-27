import { FPLBOT_API_BASEURL } from "../utils/envconfig";
import { VerifiedType } from "./VerifiedType";


export interface GetVirtualLeaguesSuccess {
  type: "SUCCESS";
  data: VerifiedType[];
}

interface GetVirtualLeaguesError {
  type: "ERROR";
}

export type GetVirtualLeaguesResponse =
  | GetVirtualLeaguesSuccess
  | GetVirtualLeaguesError;

export function getVirtualLeagues(): Promise<GetVirtualLeaguesResponse> {
  return fetch(`${FPLBOT_API_BASEURL}/virtual-leagues`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then(
      (json: VerifiedType[]): GetVirtualLeaguesSuccess => {
        return { type: "SUCCESS", data: json };
      }
    )
    .catch(
      (error): GetVirtualLeaguesError => {
        return { type: "ERROR" };
      }
    );
}