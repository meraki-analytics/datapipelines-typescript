import { DataPipeline } from './data-pipeline';

export class PipelineContext extends Map<string, object> {
    private pipeline: DataPipeline;

    set = (key: string, value: object) => {
        if (!value) {
            this.delete(key);
            return this;
        } else {
            return super.set(key, value);
        }
    }

    getPipeline = () => {
        return this.pipeline;
    }

    setPipeline = (pipeline: DataPipeline) => {
        this.pipeline = pipeline;
    }
}
