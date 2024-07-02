export default function solve({ lines, rawData }) {
    const { max, min } = Math;
    const [BOSS_HEALTH, BOSS_DAMAGE] = lines.map((x) => parseInt(x.split(': ')[1]));
    const [MAGIC_MISSILE_COST, DRAIN_COST, SHIELD_COST, POISON_COST, RECHARGE_COST] = [
        53, 73, 113, 173, 229,
    ];

    const [PLAYER, BOSS] = [0, 1];

    class State {
        player;
        boss;
        mana;
        shieldTurns;
        poisonTurns;
        rechargeTurns;
        next;
        armor;
        manaSpent;
        constructor(
            player,
            boss,
            mana,
            shieldTurns,
            poisonTurns,
            rechargeTurns,
            next,
            armor,
            manaSpent,
        ) {
            this.player = player;
            this.boss = boss;
            this.mana = mana;
            this.shieldTurns = shieldTurns;
            this.poisonTurns = poisonTurns;
            this.rechargeTurns = rechargeTurns;
            this.next = next;
            this.armor = armor;
            this.manaSpent = manaSpent;
        }
    }

    let leastMana = Infinity;
    let queue = [new State(50, BOSS_HEALTH, 500, 0, 0, 0, PLAYER, 0, 0)];

    while (queue.length > 0) {
        let state = queue.shift();

        if (state.manaSpent >= leastMana) {
            continue;
        }

        if (state.next == PLAYER) {
            state.player--;
        }

        // Check if player is dead
        if (state.player <= 0) {
            continue;
        }

        // Apply Effects
        if (state.shieldTurns > 0) {
            state.shieldTurns--;
            state.armor = 7;
        } else {
            state.armor = 0;
        }

        if (state.poisonTurns > 0) {
            state.poisonTurns--;
            state.boss -= 3;
        }

        if (state.rechargeTurns > 0) {
            state.rechargeTurns--;
            state.mana += 101;
        }

        // Check if boss is dead
        if (state.boss <= 0) {
            leastMana = min(leastMana, state.manaSpent);
            continue;
        }

        // Add states to queue
        if (state.next == PLAYER) {
            // Player turn
            if (state.mana >= MAGIC_MISSILE_COST) {
                let newState = new State(
                    state.player,
                    state.boss - 4,
                    state.mana - MAGIC_MISSILE_COST,
                    state.shieldTurns,
                    state.poisonTurns,
                    state.rechargeTurns,
                    BOSS,
                    state.armor,
                    state.manaSpent + MAGIC_MISSILE_COST,
                );
                queue.push(newState);
            }

            if (state.mana >= DRAIN_COST) {
                let newState = new State(
                    state.player + 2,
                    state.boss - 2,
                    state.mana - DRAIN_COST,
                    state.shieldTurns,
                    state.poisonTurns,
                    state.rechargeTurns,
                    BOSS,
                    state.armor,
                    state.manaSpent + DRAIN_COST,
                );
                queue.push(newState);
            }

            if (state.mana >= SHIELD_COST && state.shieldTurns === 0) {
                let newState = new State(
                    state.player,
                    state.boss,
                    state.mana - SHIELD_COST,
                    6,
                    state.poisonTurns,
                    state.rechargeTurns,
                    BOSS,
                    state.armor,
                    state.manaSpent + SHIELD_COST,
                );
                queue.push(newState);
            }

            if (state.mana >= POISON_COST && state.poisonTurns === 0) {
                let newState = new State(
                    state.player,
                    state.boss,
                    state.mana - POISON_COST,
                    state.shieldTurns,
                    6,
                    state.rechargeTurns,
                    BOSS,
                    state.armor,
                    state.manaSpent + POISON_COST,
                );
                queue.push(newState);
            }

            if (state.mana >= RECHARGE_COST && state.rechargeTurns === 0) {
                let newState = new State(
                    state.player,
                    state.boss,
                    state.mana - RECHARGE_COST,
                    state.shieldTurns,
                    state.poisonTurns,
                    5,
                    BOSS,
                    state.armor,
                    state.manaSpent + RECHARGE_COST,
                );
                queue.push(newState);
            }
        } else {
            // Boss turn
            let damage = max(1, BOSS_DAMAGE - state.armor);
            let newState = new State(
                state.player - damage,
                state.boss,
                state.mana,
                state.shieldTurns,
                state.poisonTurns,
                state.rechargeTurns,
                PLAYER,
                state.armor,
                state.manaSpent,
            );
            queue.push(newState);
        }

        queue.sort((a, b) => a.boss - b.boss);
    }

    const answer = leastMana;
    return { value: answer };
}
