import { UnsupportedError } from '../errors/unsupported-error';
import { PipelineContext } from '../pipeline-context';
import { Class } from '../common/class';
import { IPipelineElement } from '../pipeline-element';

export interface IDataSource extends IPipelineElement {
    get<T>(type: Class, query: Map<string, object>, context: PipelineContext): T;
    getMany<T>(type: Class, query: Map<string, object>, context: PipelineContext): T[];
    provides(): Set<Class>;
}
