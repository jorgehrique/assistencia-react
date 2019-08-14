import React from 'react';
import ReactAutoComplete from "react-autocomplete";
import { buscarClientesPorNome } from "../../services/ClienteService";

export default class AutoCompleteInput extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: '',
            items: [],
        }
    }

    onChangeHandle = event => {
        const { value } = event.target;
        buscarClientesPorNome(value, 5)
            .then(response => {
                const { content } = response;
                this.setState({
                    items: content
                });
            })
            .catch(console.error);
        this.setState({ value });
    }

    render() {
        return (
            <ReactAutoComplete
                items={this.state.items}
                shouldItemRender={(item, value) => item.nome.toLowerCase().indexOf(value.toLowerCase()) > -1}
                getItemValue={item => `${item.id}-${item.nome}`}
                renderItem={(item, highlighted) =>
                    <div
                        key={item.id}
                        style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                    >
                        {`${item.nome.toUpperCase()}`}
                    </div>
                }
                value={this.state.value}
                onChange={this.onChangeHandle}
                onSelect={value => {
                    const arr = value.split('-');
                    this.props.getId(arr[0]);
                    this.setState({ value: arr[1] })
                }}
            />
        )
    }
}