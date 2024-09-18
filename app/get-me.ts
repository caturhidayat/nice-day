"use server";
import { ProfileProps } from "./common/action";
import { get } from "./common/utils/fetch";



export default async function getProfile() {
    return get<ProfileProps>("users/profile");
}
