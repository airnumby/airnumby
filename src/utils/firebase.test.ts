import { fromFirebaseDoc } from './firebase';


describe('fromFirebaseDoc', () => {
    test('handle map', () => {
        const input = {
            name: 'test',
            value: {
                a: 'a',
                b: 'b',
            }
        }

        const mockedDoc = mockFirebaseDoc('123', input);
        const result = fromFirebaseDoc(mockedDoc, { mapKeys: ['value'] });

        expect(result.name).toBe(input.name);
        expect(result.value.get('a')).toBe(input.value.a);
        expect(result.value.get('b')).toBe(input.value.b);
    });
})

const mockFirebaseDoc = (id: string, data: any) => {
    return {
        id,
        data: () => data,
    }
}