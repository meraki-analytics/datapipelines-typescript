import { IPipelineElement } from '../pipeline-element';
import { Class } from '../common/class';
import { PipelineContext } from '../pipeline-context';

export interface IDataSink extends IPipelineElement {
    accepts(): Set<Class>;

    put<T>(type: Class, item: T, context: PipelineContext): void;
    putMany<T>(type: Class, items: T[], context: PipelineContext): void;
}
