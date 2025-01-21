import mapQueryUrl from "./map-query-url";

const locationSuggestions = async (input: string) => {
  if (!input) return;
  const token = JSON.parse(localStorage.getItem("token")!);
  const response = await fetch(`${mapQueryUrl.suggestions}?input=${input}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "omit",
  });
  return response.json();
};

export { locationSuggestions };
