import { get } from "./common/utils/fetch";

export default async function getMe() {
    return get("me");
}