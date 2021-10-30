
export interface ConvertionOptions {
    mapKeys?: string[]
}

export function toFirebaseDoc<Type>(obj: Type): any {
    const data: any = { ...obj };
    delete data.id;
    return data;
}

export function fromFirebaseDoc<Type>(doc: any, options: ConvertionOptions = {}): Type {
    const data = doc.data();
    const convertedData: any = {
        id: doc.id,
    };
    for (const key of Object.keys(data)) {
        let value = data[key];
        if ((options.mapKeys || []).includes(key)) {
            value = new Map(Object.entries(value));
        } else if (typeof value === 'object' && value?.toDate) {
            value = value.toDate();
        }
        convertedData[key] = value;
    }

    return convertedData;
}

export function fromFirebaseDocs<Type>(docs: Array<any>): Array<Type> {
    return docs.map(doc => fromFirebaseDoc<Type>(doc));
}
