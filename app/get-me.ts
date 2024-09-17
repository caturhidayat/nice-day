"use server";
import { get } from "./common/utils/fetch";

type ProfileProps = {
  id: string;
  name: string;
  departement: string;
  branch: string;
};

export default async function getProfile() {
  return get<ProfileProps>("users/profile", ["attendances", "attendance"]);
}
