import { Inject, Injectable } from '@angular/core';
import { find } from 'lodash';

/**
 * JOB main fields interface
 */
export interface InterfaceFieldsCronJobs {
    _id: string;
    value: string;
    label: string;
}

/**
 * Interface of fields to object with presets
 */
export interface InterfaceFieldsCronJobsCommonOption {
    _id: string;
    value: string;
    label: string;
    children: Array<{ [k: string]: InterfaceFieldsCronJobs }>;
}

@Injectable({
    providedIn: 'root'
})
export class CronJobService {
    /**
     * Constructor
     */
    constructor() {}

    /**
     * Generates the available minutes to build JOB
     * @constructor
     */
    CJminutes(): InterfaceFieldsCronJobs[] {
        return [
            {
                _id: '1',
                value: '0',
                label: 'No minuto 0'
            },
            {
                _id: '2',
                value: '0,30',
                label: 'No minuto 30 (0,30)'
            }
        ];
    }

    /**
     * Generates the available hours to build JOB
     * @constructor
     */
    CJhours(): InterfaceFieldsCronJobs[] {
        const values = [];

        // Generate 1 - 23
        for (const ky of Array.from(Array(24).keys())) {
            values.push({
                _id: String(ky),
                value: String(ky),
                label: String(ky)
            });
        }

        values.push({
            _id: '24',
            value: '*',
            label: 'Todas as horas (*)'
        });

        values.push({
            _id: '25',
            value: '*/2',
            label: 'Cada 2hs (*/2)'
        });

        values.push({
            _id: '26',
            value: '*/4',
            label: 'Cada 4hs (*/4)'
        });

        values.push({
            _id: '27',
            value: '0,12',
            label: 'Cada 12hs ( 0,12)'
        });

        return values;
    }

    /**
     * Generates the available days to build JOB
     * @constructor
     */
    CJday(): InterfaceFieldsCronJobs[] {
        const valuesDays = [];

        // Generate 1 - 23
        for (const ky of Array.from(Array(32).keys())) {
            valuesDays.push({
                _id: String(ky),
                value: String(ky),
                label: String(ky)
            });
        }

        valuesDays.push({
            _id: '33',
            value: '*',
            label: 'Todos os dias (*)'
        });

        valuesDays.push({
            _id: '34',
            value: '1,15',
            label: 'Cada 15 dias (1,15)'
        });

        return valuesDays;
    }

    /**
     * Generates the available months to build JOB
     * @constructor
     */
    CJmonth(): InterfaceFieldsCronJobs[] {
        return [
            {
                _id: '1',
                value: '1',
                label: 'Janeiro'
            },
            {
                _id: '2',
                value: '2',
                label: 'Fevereiro'
            },
            {
                _id: '3',
                value: '3',
                label: 'Março'
            },
            {
                _id: '4',
                value: '4',
                label: 'Abril'
            },
            {
                _id: '5',
                value: '5',
                label: 'Maio'
            },
            {
                _id: '6',
                value: '6',
                label: 'Junho'
            },
            {
                _id: '7',
                value: '7',
                label: 'Julho'
            },
            {
                _id: '8',
                value: '8',
                label: 'Agosto'
            },
            {
                _id: '9',
                value: '9',
                label: 'Setembro'
            },
            {
                _id: '10',
                value: '10',
                label: 'Outubro'
            },
            {
                _id: '11',
                value: '11',
                label: 'Novembro'
            },
            {
                _id: '12',
                value: '12',
                label: 'Dezembro'
            },
            {
                _id: '13',
                value: '*',
                label: 'Todos os mêses (*)'
            }
        ];
    }

    /**
     * Generates the available days to Week to build JOB
     * @constructor
     */
    CJdaysWeek(): InterfaceFieldsCronJobs[] {
        return [
            {
                _id: '1',
                value: '1',
                label: 'Segunda-feira'
            },
            {
                _id: '2',
                value: '2',
                label: 'Terça-feira'
            },
            {
                _id: '3',
                value: '3',
                label: 'Quarta-feira'
            },
            {
                _id: '4',
                value: '4',
                label: 'Quinta-feira'
            },
            {
                _id: '5',
                value: '5',
                label: 'Sexta-feira'
            },
            {
                _id: '6',
                value: '6',
                label: 'Sábado'
            },
            {
                _id: '7',
                value: '7',
                label: 'Domingo'
            },
            {
                _id: '8',
                value: '*',
                label: 'Todos os dias da semana (*)'
            }
        ];
    }

    /**
     * Generates some commonly used patterns with defaults
     * @constructor
     */
    CJCommonOption(): InterfaceFieldsCronJobsCommonOption[] {
        return [
            {
                _id: '1',
                value: '0 * * * *',
                label: 'Uma vez por hora',
                children: [
                    {
                        minutes: find(this.CJminutes(), (o) => {
                            return o.value === '0';
                        }),
                        hours: find(this.CJhours(), (o) => {
                            return o.value === '*';
                        }),
                        day: find(this.CJday(), (o) => {
                            return o.value === '*';
                        }),
                        month: find(this.CJmonth(), (o) => {
                            return o.value === '*';
                        }),
                        daysWeek: find(this.CJdaysWeek(), (o) => {
                            return o.value === '*';
                        })
                    }
                ]
            },
            {
                _id: '2',
                value: '0,30 * * * *',
                label: 'Duas vezes por hora',
                children: [
                    {
                        minutes: find(this.CJminutes(), (o) => {
                            return o.value === '0,30';
                        }),
                        hours: find(this.CJhours(), (o) => {
                            return o.value === '*';
                        }),
                        day: find(this.CJday(), (o) => {
                            return o.value === '*';
                        }),
                        month: find(this.CJmonth(), (o) => {
                            return o.value === '*';
                        }),
                        daysWeek: find(this.CJdaysWeek(), (o) => {
                            return o.value === '*';
                        })
                    }
                ]
            },
            {
                _id: '3',
                value: '0 0,12 * * *',
                label: 'Duas vezes por dia',
                children: [
                    {
                        minutes: find(this.CJminutes(), (o) => {
                            return o.value === '0';
                        }),
                        hours: find(this.CJhours(), (o) => {
                            return o.value === '0,12';
                        }),
                        day: find(this.CJday(), (o) => {
                            return o.value === '*';
                        }),
                        month: find(this.CJmonth(), (o) => {
                            return o.value === '*';
                        }),
                        daysWeek: find(this.CJdaysWeek(), (o) => {
                            return o.value === '*';
                        })
                    }
                ]
            },
            {
                _id: '4',
                value: '0 0 * * *',
                label: 'Uma vez por dia',
                children: [
                    {
                        minutes: find(this.CJminutes(), (o) => {
                            return o.value === '0';
                        }),
                        hours: find(this.CJhours(), (o) => {
                            return o.value === '0';
                        }),
                        day: find(this.CJday(), (o) => {
                            return o.value === '*';
                        }),
                        month: find(this.CJmonth(), (o) => {
                            return o.value === '*';
                        }),
                        daysWeek: find(this.CJdaysWeek(), (o) => {
                            return o.value === '*';
                        })
                    }
                ]
            },
            {
                _id: '5',
                value: '0 0 1,15 * *',
                label: 'A cada 15 dias',
                children: [
                    {
                        minutes: find(this.CJminutes(), (o) => {
                            return o.value === '0';
                        }),
                        hours: find(this.CJhours(), (o) => {
                            return o.value === '0';
                        }),
                        day: find(this.CJday(), (o) => {
                            return o.value === '1,15';
                        }),
                        month: find(this.CJmonth(), (o) => {
                            return o.value === '*';
                        }),
                        daysWeek: find(this.CJdaysWeek(), (o) => {
                            return o.value === '*';
                        })
                    }
                ]
            },
            {
                _id: '6',
                value: '0 0 1 * *',
                label: 'Uma vez por mês',
                children: [
                    {
                        minutes: find(this.CJminutes(), (o) => {
                            return o.value === '0';
                        }),
                        hours: find(this.CJhours(), (o) => {
                            return o.value === '0';
                        }),
                        day: find(this.CJday(), (o) => {
                            return o.value === '1';
                        }),
                        month: find(this.CJmonth(), (o) => {
                            return o.value === '*';
                        }),
                        daysWeek: find(this.CJdaysWeek(), (o) => {
                            return o.value === '*';
                        })
                    }
                ]
            },
            {
                _id: '7',
                value: '0 0 1 1 *',
                label: 'Uma vez por ano',
                children: [
                    {
                        minutes: find(this.CJminutes(), (o) => {
                            return o.value === '0';
                        }),
                        hours: find(this.CJhours(), (o) => {
                            return o.value === '0';
                        }),
                        day: find(this.CJday(), (o) => {
                            return o.value === '1';
                        }),
                        month: find(this.CJmonth(), (o) => {
                            return o.value === '1';
                        }),
                        daysWeek: find(this.CJdaysWeek(), (o) => {
                            return o.value === '*';
                        })
                    }
                ]
            }
        ];
    }
}
