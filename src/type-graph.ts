export class TypeGraph {

    constructor(transformers: DataTransformer[]) {
        const cheapestTransformer = {};
        for (const transformer of transformers) {
            const transforms = transformer.transforms;
            for (const from in transforms) {
                if (transforms.hasOwnProperty(from)) {
                    let cheapestTo = cheapestTransformer[from];
                    if (!cheapestTo) {
                        cheapestTo = {};
                        cheapestTransformer[from] = cheapestTo;
                    }

                    for (const to of transforms[from]) {
                        const cheapest = cheapestTo[to];
                        if (!cheapest || transformer.cost < cheapest.cost) {
                            cheapestTo[to] = transformer;
                        }
                    }
                }
            }

            cheapest = cheapestTransformer;

            // Build graph
        }
    }
}
