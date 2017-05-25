import Papa from 'papaparse';
import './ObjectStorage'
import _ from 'lodash';
import ProductGroups from '../groups.json';

const ProductUtils = {
    getFromStorage() {
        if (localStorage.hasOwnProperty('products')) {
            return localStorage.getObject('products');
        }
        console.log("No Products")
        return {};
    },

    setToStorage(products) {
        console.log("Writing Products to local storage:")
        console.log(products)
        localStorage.setObject('products', products);
    },

    fetch() {
        return new Promise((resolve, reject) => {
            Papa.parse('https://raw.githubusercontent.com/NationalAssociationOfRealtors/SmartHomeChecklist/master/sample-products.csv', {
                download: true,
                header: true,
                complete: (products, file) => {
                    resolve(new Promise((resolve, reject) => {
                        Papa.parse('https://raw.githubusercontent.com/NationalAssociationOfRealtors/SmartHomeDBAPI/4eb29dc4d9a00be219fa35d606f7e94b6d471dea/priv/manufacturer_ranking.csv?token=AG5cQ44D9tKqV8Rgi268gHjVGy-iFhYsks5ZL94ewA%3D%3D', {
                            download: true,
                            header: false,
                            complete: (manufacturers, file_1) => {
                                resolve(this.transform(products.data, manufacturers.data))
                            },
                            error: (error, file) => {
                                reject(Error(error))
                            }
                        });
                    }));
                },
                error: (error, file) => {
                    reject(Error(error))
                }
            });
        });
    },

    transform(products, manufacturers) {
        const deviceClassGroups = {};
        const byId = {};
        const byGroup = {};

        manufacturers = [].concat.apply([], manufacturers);

        console.log("Got Products: ")
        console.log(products)
        console.log("Manufacturers")
        console.log(manufacturers)
        _.keys(ProductGroups).forEach(group => {
            // Create hash of device classes to groups
            ProductGroups[group].forEach(device_class => {
                deviceClassGroups[device_class] = group;
            });
            // Initialize byGroup keys
            byGroup[group] = [];
        });


        products.sort(function(a, b) {
            return Math.sign(manufacturers.indexOf(a.manufacturer) - manufacturers.indexOf(b.manufacturer))
        });


        products.forEach(row => {
            // Create hash of product ids
            byId[row.hash] = _.omit(row, ['hash'])

            // Create hash of groups
            let group = deviceClassGroups[row.device_class]

            if (group) {
                byGroup[group].push(row.hash)
            } else {
                console.log(`Warning: ${row.device_class} not assigned to a group`)
            }
        });
        console.log("By Manufacturer")
        console.log(byGroup)



        return {
            byId: byId,
            byGroup: byGroup
        };
    },
}

export default ProductUtils;
