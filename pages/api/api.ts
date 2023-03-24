import { Product } from "@/components/product/types";
import axios from "axios";
import Papa from "papaparse"

export default {
    list:async():Promise<Product[]>=>{
        return axios.get("https://docs.google.com/spreadsheets/d/e/2PACX-1vTD65gRFb7ZdVUT0-Hzn48BEdPAmD4m4FL_MnDn9z0TGIRMk5qFK9s_Fl_9swNBTKxHX-gicSJ5Fd-a/pub?output=csv", {
            responseType: "blob"
        }).then(response=>{
            return new Promise<Product[]>((resolve, reject) => {
                Papa.parse(response.data, {
                    header: true,
                    complete: results=>{
                        const products=results.data as Product[]
                        return resolve(products.map(product =>({
                            ...product,
                            price: Number(product.price)
                        })))
                    },
                    error: (error)=>{
                        return reject(error.message || error)
                    }
                })
            })
        })
    }
}