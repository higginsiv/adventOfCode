export default function solve({ lines, rawData }) {
    const { max, ceil } = Math;
    const [BOSS_HEALTH, BOSS_DAMAGE, BOSS_ARMOR] = lines.map((x) => parseInt(x.split(': ')[1]));

    const HEALTH = 100;

    const WEAPONS = [
        [8, 4, 0],
        [10, 5, 0],
        [25, 6, 0],
        [40, 7, 0],
        [74, 8, 0],
    ];
    const ARMOR = [
        [0, 0, 0],
        [13, 0, 1],
        [31, 0, 2],
        [53, 0, 3],
        [75, 0, 4],
        [102, 0, 5],
    ];
    const RINGS = [
        [0, 0, 0],
        [0, 0, 0],
        [25, 1, 0],
        [50, 2, 0],
        [100, 3, 0],
        [20, 0, 1],
        [40, 0, 2],
        [80, 0, 3],
    ];

    let answer = Infinity;

    WEAPONS.forEach((w) => {
        ARMOR.forEach((a) => {
            RINGS.forEach((r1) => {
                RINGS.forEach((r2) => {
                    if (r1[0] !== r2[0]) {
                        let cost = w[0] + a[0] + r1[0] + r2[0];
                        let damage = w[1] + a[1] + r1[1] + r2[1];
                        let armor = w[2] + a[2] + r1[2] + r2[2];

                        let playerTurnsToKill = ceil(
                            BOSS_HEALTH / max(1, damage - BOSS_ARMOR),
                        );
                        let bossTurnsToKill = ceil(HEALTH / max(1, BOSS_DAMAGE - armor));

                        if (playerTurnsToKill <= bossTurnsToKill) {
                            if (answer > cost) {
                                answer = cost;
                            }
                        }
                    }
                });
            });
        });
    });

    return { value: answer };
}
