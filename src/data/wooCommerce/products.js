import wooCredential from "./wooCredentialKey";

const wooapi = wooCredential();
async function productss() {
  try {
    const response = await wooapi.get("products");
    return response;
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
  }
}

export default productss;
