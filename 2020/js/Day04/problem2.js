export default function solve({ lines, rawData }) {
    import { EOL } from 'os';
    const data = rawData.split(EOL + EOL).map((x) => {
        x = x.replaceAll(':', ' ');
        x = x.replaceAll(EOL, ' ');
        x = x.split(' ');

        let ret = new Map();
        for (let i = 0; i < x.length; i = i + 2) {
            ret.set(x[i], x[i + 1]);
        }
        return ret;
    });

    const [BIRTH_YEAR, ISSUE_YEAR, EXPIRATION_YEAR, HEIGHT, HAIR_COLOR, EYE_COLOR, PASSPORT_ID] = [
        'byr',
        'iyr',
        'eyr',
        'hgt',
        'hcl',
        'ecl',
        'pid',
    ];

    const answer = data.reduce((total, curr) => {
        return curr.get(BIRTH_YEAR) != null &&
            validate(BIRTH_YEAR, curr.get(BIRTH_YEAR)) &&
            curr.get(ISSUE_YEAR) != null &&
            validate(ISSUE_YEAR, curr.get(ISSUE_YEAR)) &&
            curr.get(EXPIRATION_YEAR) != null &&
            validate(EXPIRATION_YEAR, curr.get(EXPIRATION_YEAR)) &&
            curr.get(HEIGHT) != null &&
            validate(HEIGHT, curr.get(HEIGHT)) &&
            curr.get(HAIR_COLOR) != null &&
            validate(HAIR_COLOR, curr.get(HAIR_COLOR)) &&
            curr.get(EYE_COLOR) != null &&
            validate(EYE_COLOR, curr.get(EYE_COLOR)) &&
            curr.get(PASSPORT_ID) != null &&
            validate(PASSPORT_ID, curr.get(PASSPORT_ID))
            ? total + 1
            : total;
    }, 0);

    function validate(type, value) {
        switch (type) {
            case BIRTH_YEAR:
                value = parseInt(value);
                return value >= 1920 && value <= 2002;
            case ISSUE_YEAR:
                value = parseInt(value);
                return value >= 2010 && value <= 2020;
            case EXPIRATION_YEAR:
                value = parseInt(value);
                return value >= 2020 && value <= 2030;
            case HEIGHT:
                if (value.indexOf('cm') !== -1) {
                    value = parseInt(value.slice(0, value.indexOf('cm')));
                    return value >= 150 && value <= 193;
                }
                if (value.indexOf('in') !== -1) {
                    value = parseInt(value.slice(0, value.indexOf('in')));
                    return value >= 59 && value <= 76;
                }
                return false;
            case HAIR_COLOR:
                let reg = new RegExp('^#[a-f0-9]{6}$');
                return reg.test(value);
            case EYE_COLOR:
                return (
                    value === 'amb' ||
                    value === 'blu' ||
                    value === 'brn' ||
                    value === 'gry' ||
                    value === 'grn' ||
                    value === 'hzl' ||
                    value === 'oth'
                );
            case PASSPORT_ID:
                return value.length === 9;
        }
    }

    return { value: answer };
}
