export function formateProfile(profile) {
  return {
    id: profile.id,
    ...profile.attributes,
  };
}
