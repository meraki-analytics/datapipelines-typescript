import { IDataSource } from './data-source';
import { PipelineContext } from '../pipeline-context';
import { Class } from '../common/class';

export class CompositeDataSource implements IDataSource {
    sources: Map<Class, IDataSource[]>;

    constructor(sources: IDataSource[]) {
        const sourceMapping = new Map<Class, IDataSource[]>();
        for (const source of sources) {
            for (const provided of source.provides()) {
                let forType: IDataSource[] = sourceMapping.get(provided);

                if (!forType) {
                    forType = [];
                    sourceMapping.set(provided, forType);
                }

                forType.push(source);
            }
        }

        this.sources = sourceMapping;
    }

    get<T>(type: Class, query: Map<string, object>, context: PipelineContext): T {
        const sources = this.sources.get(type);
        if (!sources) {
            return null;
        }

        for (const source of sources) {
            const result = source.get<T>(type, query, context);
            if (result) {
                return result;
            }
        }

        return null;
    }

    getMany<T>(type: Class, query: Map<string, object>, context: PipelineContext): T[] {
        const sources = this.sources.get(type);
        if (!sources) {
            return null;
        }

        for (const source of sources) {
            const result = source.getMany<T>(type, query, context);
            if (result) {
                return result;
            }
        }

        return null;
    }

    provides(): Set<Class> {
        return new Set<Class>(this.sources.keys());
    }
}
