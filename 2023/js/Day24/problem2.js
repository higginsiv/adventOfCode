module.exports = { solve: solve };

async function solve({ lines, rawData }) {
    const { init } = require('z3-solver');

    const DATA = lines.map((x) => x.match(/-?\d+/g).map((x) => parseInt(x)));

    async function getAnswer() {
        const { Context, em } = await init();
        const { Solver, Real } = new Context('main');
        const solver = new Solver();
    
        let [x, y, z, dx, dy, dz] = [
            Real.const('x'),
            Real.const('y'),
            Real.const('z'),
            Real.const('dx'),
            Real.const('dy'),
            Real.const('dz'),
        ];
    
        DATA.slice(0, 3).forEach(([xp, yp, zp, dxp, dyp, dzp], i) => {
            let t = Real.const(`t${i}`);
            solver.add(t.mul(dxp).add(xp).sub(x).sub(t.mul(dx)).eq(0));
            solver.add(t.mul(dyp).add(yp).sub(y).sub(t.mul(dy)).eq(0));
            solver.add(t.mul(dzp).add(zp).sub(z).sub(t.mul(dz)).eq(0));
        });
    
        const result = await solver.check();
    
        if (result !== 'sat') {
            throw new Error('Unsatisfiable');
        }
    
        const answer = solver.model().eval(x.add(y).add(z)).value();
        em.PThread.terminateAllThreads();
        return answer;
    }

    return { value: parseInt((await getAnswer()).numerator) };
}