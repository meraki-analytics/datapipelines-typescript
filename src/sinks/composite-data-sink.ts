import { IDataSink } from './data-sink';
import { Class } from '../common/class';
import { PipelineContext } from '../pipeline-context';

export class CompositeDataSink implements IDataSink {
    sinks: Map<Class, IDataSink[]>;

    constructor(sinks: IDataSink[]) {
        const sinkMapping = new Map<Class, IDataSink[]>();
        for (const sink of sinks) {
            for (const accepted of sink.accepts()) {
                let forType = sinkMapping.get(accepted);

                if (!forType) {
                    forType = [];
                    sinkMapping.set(accepted, forType);
                }

                forType.push(sink);
            }
        }

        this.sinks = sinkMapping;
    }

    put<T>(type: Class, item: T, context: PipelineContext): void {
        const sinks = this.sinks.get(type);
        if (!sinks) {
            return null;
        }

        for (const sink of sinks) {
            sink.put(type, item, context);
        }
    }

    putMany<T>(type: Class, items: T[], context: PipelineContext): void {
        const sinks = this.sinks.get(type);
        if (!sinks) {
            return null;
        }

        for (const sink of sinks) {
            sink.putMany(type, items, context);
        }
    }

    accepts(): Set<Class> {
        return new Set<Class>(this.sinks.keys());
    }
}
