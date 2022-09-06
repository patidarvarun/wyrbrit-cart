import wooCredential from "./wooCredentialKey";

const wooapi = wooCredential();
async function productDetail(id) {
  try {
    const response = await wooapi.get(`products/?slug=${id}`);
    // const response = await wooapi.get("products/4171");

    return response;
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
  }
}

export default productDetail;
