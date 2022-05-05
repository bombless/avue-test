Vue.use(AVUE);
onload = () => {

    function updateTrColor(constraints, lines, color) {
        let css = '';
        for (const line of lines) {
            css += constraints + ' tr:nth-child(' + (1 + line) + ') {background-color:' + color + '}'
        }
        const el = document.createElement('style');
        if (updateTrColor[constraints]) {
            document.head.removeChild(updateTrColor[constraints]);
        }
        updateTrColor[constraints] = el;
        el.textContent = css;
        document.head.appendChild(el);
    }

    new Vue({
        el: '#content',
        data() {
            const instanceId = 'instance' + Math.floor(Math.random() * 1000000);
            return {
                instanceId,
                list: [],
                option: {
                    menu: true,
                    addBtn: false,
                    delBtn: false,
                    editBtn: false,
                    column: [{
                        prop: 'text',
                        label: '转诊原因',
                    },{
                        prop: 'date',
                        label: '日期',
                    },],
                },
            };
        },
        methods: {
            randomData() {
                this.list.length = 0;
                for (let i = 0; i < 5; i += 1) {
                    this.list.push({
                        text: Math.random() > .5 ? '血压高危急情况' : '',
                        date: '2022-05-05',
                    });
                }
                
            }
        },
        watch: {
            list: {
                deep: true,
                handler(newVal) {
                    const newIndices = heightlightLines(newVal);

                    function heightlightLines(arr) {
                        return arr.reduce((acc, val, idx) => {
                            if (val.text) {
                                acc.push(idx);
                            }
                            return acc;
                        }, []);
                    }
                    updateTrColor('#' + this.instanceId, newIndices, 'grey');
                },
            }
        }
    });
};
