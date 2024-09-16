'use server';
import { get } from "./common/utils/fetch";

export default async function getProfile() {
    return get("users/profile");
}