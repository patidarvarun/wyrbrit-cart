import wooCredential from "./wooCredentialKey";

const wooapi = wooCredential();
async function country() {
  try {
    const response = await wooapi.get("data/countries");
    return response;
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
  }
}

export default country;
