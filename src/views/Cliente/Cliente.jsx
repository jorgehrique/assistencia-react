import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import Button from "components/CustomButtons/Button.jsx";
import ClienteTable from "components/Table/ClienteTable";

import { cpfToString, telefoneToString } from "../../utils/FormatConverter";
import { logError, logObject } from "../../utils/Debug";

import {
  buscarClientes, buscarClientePorId,
  salvarCliente, editarCliente, excluirCliente
}
  from "../../services/ClienteService";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class Cliente extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      form: {
        endereco: {},
        telefones: []
      },
      cabecalho: [],
      clientes: [],
      notification: {},
    };
  }

  componentDidMount() {
    this.updateClientes();
  }

  notification = (message, color) => {
    this.setState({
      notification: {
        color,
        message,
        visible: true
      }
    });

    setTimeout(() => this.setState({
      notification: {
        message: '...',
        color: 'success',
        visible: false
      }
    }), 3000);
  }

  changeHandle = e => {
    const { form } = this.state;
    this.setState({ form: { ...form, [e.target.id]: e.target.value } });
  }

  updateEnderecoFields = event => {
    let form = this.state.form;
    form.endereco[event.target.id] = event.target.value;
    this.setState({ form });
  }

  updateTelefoneField = event => {
    let form = this.state.form;
    const { id, value } = event.target;
    if (id == 'telefone0') form.telefones[0] = value;
    else if (id == 'telefone1') form.telefones[1] = value;
    this.setState({ form });
  }

  updateClientes = () => {
    buscarClientes()
      .then(response => {
        const { content } = response;
        const clientes = content.map(c => {
          return Object.values({
            id: c.id,
            nome: c.nome,
            cpf: cpfToString(c.cpf),
            telefone: telefoneToString(c.telefones[0]),
          });
        });

        this.setState({
          clientes
        })
      })
      .catch(erro => console.log(erro));
  }

  salvarHandle = () => {
    const { form } = this.state;
    if (form.editar) {
      editarCliente(form.id, form)
        .then(cliente => {
          this.updateClientes();
          this.notification(`Cliente ${cliente.nome} foi editado`, 'success');
        })
        .catch(erro => this.notification(`Erro ao editar o cliente ${form.nome}`, 'danger'));

    } else {
      salvarCliente(form)
        .then(cliente => {
          this.updateClientes();
          this.notification(`Cliente ${cliente.nome} foi salvo`, 'success');
        })
        .catch(erro => this.notification(`Erro ao salvar o cliente ${form.nome}`, 'danger'));
    }
    this.limparHandle();
  }

  detalhesHandle = id => {
    buscarClientePorId(id)
      .then(cliente => {
        logObject('detalhesHandle', cliente);
      })
      .catch(error => {
        this.notification('Erro ao buscar cliente para edição', 'danger');
        logError('detalhesHandle', error);
      });
  }

  editarHandle = id => {
    this.limparHandle();
    buscarClientePorId(id)
      .then(cliente => {
        this.setState({
          form: { editar: true, ...cliente }
        });
      })
      .catch(error => {
        this.notification('Erro ao buscar cliente para edição', 'danger');
        logError('editarHandle', error);
      });
    //this.handleScrollToStats();
  }

  deleteHandle = id => {
    excluirCliente(id)
      .then(() => {
        this.updateClientes();
        this.notification(`Cliente #${id} foi deletado`, 'success');
      })
      .catch(error => {
        this.notification(`Erro ao deletar o cliente #${id}`, 'danger');
        logError('deleteHandle', error)
      });
    this.limparHandle();
  }

  limparHandle = () => {
    this.setState({
      form:
      {
        editar: false,
        id: null,
        nome: '',
        cpf: '',
        hasCNPJ: '',
        email: '',
        endereco: {
          endereco: '',
          bairro: '',
          cidade: '',
          complemento: ''
        },
        telefones: ['', '']
      }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <Snackbar
          place="tr"
          color={this.state.notification.color}
          message={this.state.notification.message}
          open={this.state.notification.visible}
          closeNotification={() => this.setState({ notification: { visible: false } })}
          close
        />
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Criar</h4>
              <p className={classes.cardCategoryWhite}>Complete com dados do cliente</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Nome Completo"
                    id="nome"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: this.changeHandle,
                      value: this.state.form.nome
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="CPF"
                    id="cpf"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: this.changeHandle,
                      value: this.state.form.cpf
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="E-mail"
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: this.changeHandle,
                      value: this.state.form.email
                    }}
                  />

                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Endereço"
                    id="endereco"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: this.updateEnderecoFields,
                      value: this.state.form.endereco.endereco
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Bairro"
                    id="bairro"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: this.updateEnderecoFields,
                      value: this.state.form.endereco.bairro
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Cidade"
                    id="cidade"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: this.updateEnderecoFields,
                      value: this.state.form.endereco.cidade
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Telefone"
                    id="telefone0"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: this.updateTelefoneField,
                      value: this.state.form.telefones[0]
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Telefone"
                    id="telefone1"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: this.updateTelefoneField,
                      value: this.state.form.telefones[1]
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={2} sm={2} md={2}>
                  <Button color="primary" onClick={this.salvarHandle}>Salvar</Button>
                </GridItem>
                <GridItem xs={3} sm={3} md={3}>
                  <Button color="primary" onClick={this.limparHandle}>Limpar</Button>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Clientes</h4>
              <p className={classes.cardCategoryWhite}></p>
            </CardHeader>
            <CardBody>
              <ClienteTable
                tableHeaderColor="primary"
                tableData={this.state.clientes}
                actions={
                  {
                    onDetails: this.detalhesHandle,
                    onEdit: this.editarHandle,
                    onDelete: this.deleteHandle,
                  }
                }
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

Cliente.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(Cliente);