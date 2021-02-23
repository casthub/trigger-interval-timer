import { PropList, PropType } from '@casthub/types';

export default class extends window.casthub.card.trigger<{
    timer: number;
}> {
    interval?: number;

    async mounted(): Promise<void> {
        await super.mounted();

        this.startTimer(this.props.timer);
    }

    onPropChange(key: string, value: any, initial: boolean): void {
        switch (key) {
            case 'timer': {
                this.startTimer(parseInt(value));
                break;
            }
        }
    }

    async prepareProps(): Promise<PropList> {
        return {
            timer: {
                type: PropType.Slider,
                required: true,
                default: 30,
                range: [5, 360],
                label: 'Interval (Seconds)',
            },
        };
    }

    startTimer(timer?: number): void {
        if (this.interval) {
            clearInterval(this.interval);
        }

        if (!timer) {
            return;
        }

        this.interval = window.setInterval(() => {
            this.trigger({});
        }, timer * 1000);
    }
}
