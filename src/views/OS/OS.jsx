import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomSelect from "components/CustomSelect/CustomSelect.jsx";
import Button from "components/CustomButtons/Button.jsx";
import ClienteInput from "components/CustomInput/AutoCompleteInput";

import { buscarClientes } from "../../services/ClienteService";

import {
  buscarOrdens, buscarCabecalho, buscarTipoOrdens, salvarOrdem,
  editarOrdem, excluirOrdem
}
  from "../../services/OSService";

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

class OrdemDeServico extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cabecalho: [],
      tipoOrdens: [],
      ordens: [],
      form: {},
      notification: {},
      clientesAutoComplete: []
    }
  }

  salvarHandle = () => {
    console.log(this.state.form);
    // salvarOrdem(this.state.form)
    //   .then(ordem => {
    //     this.notification(`Ordem #${ordem.id} foi salva`, 'success');
    //     this.updateOrdens();
    //   })
    //   .catch(() => {
    //     this.notification('Erro ao salvar ordem', 'danger');
    //   })
  }

  updateOrdens = () => {
    buscarOrdens()
      .then(response => {
        const { content } = response;
        const ordens = content.map(os => {
          return Object.values({
            id: os.id,
            cliente: os.cliente.nome,
            aparelho: os.aparelho,
            tipoOrdem: os.tipoOrdem,
            data: os.dataCricao
          })
        });
        this.setState({ ordens });
      })
      .catch(error => {
        this.notification('Erro ao atualizar a tabela de ordens', 'danger');
        console.error(error);
      });
  }

  updateFormState = event => {
    let form = this.state.form;
    form[event.target.id] = event.target.value;
    this.setState({ form });
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
        visible: false
      }
    }), 3000);
  }

  componentDidMount() {
    this.updateOrdens();

    buscarCabecalho()
      .then(cabecalho => {
        this.setState({ cabecalho });
      })
      .catch(erro => {
        this.notification('Erro ao buscar cabeçalho', 'danger');
      });

    buscarTipoOrdens()
      .then(tipoOrdens => {
        const tipos = tipoOrdens.map(e => { return { label: e, value: e } });
        this.setState({ tipoOrdens: tipos });
      })
      .catch(erro => {
        this.notification('Erro ao buscar os tipos de ordens', 'danger');
      });

    buscarClientes()
      .then(response => {
        const { content } = response;
        const clientesAutoComplete = content.map(c => {
          return { label: c.nome }
        });
        this.setState({ clientesAutoComplete });
      })
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
              <p className={classes.cardCategoryWhite}>Complete a ordem de serviço</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <ClienteInput
                    labelText="Cliente"
                    id="cliente"
                    itemClick={this.autoCompleteHandle}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: this.updateFormState
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Aparelho"
                    id="aparelho"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: this.updateFormState
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomSelect
                    labelText="Tipo de Ordem"
                    id="tipoOrdem"
                    classes={classes}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: console.log
                    }}
                    items={this.state.tipoOrdens}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Descriçâo do problema"
                    id="problema"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: this.updateFormState
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Laudo Técnico"
                    id="laudo"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: this.updateFormState
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Observação"
                    id="observacao"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: this.updateFormState
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Imei"
                    id="imei1"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: this.updateFormState
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Imei 2"
                    id="imei2"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: this.updateFormState
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={2}>
                  <CustomInput
                    labelText="Preço Bruto"
                    id="precoBruto"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <CustomInput
                    labelText="Desconto"
                    id="desconto"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <CustomInput
                    labelText="Preço Final"
                    id="preco"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Button color="primary" onClick={this.salvarHandle}>Salvar</Button>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Ordem de Serviços</h4>
              <p className={classes.cardCategoryWhite}></p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={this.state.cabecalho}
                tableData={this.state.ordens}
                tableActions={[
                  {
                    labelText: 'imprimir',
                    header: 'Imprimir',
                    visible: true,
                    onClick: event => {
                      console.log(` imprimir elemento: ${event.target.id}`)
                    }
                  },
                  {
                    labelText: 'editar',
                    header: 'Editar',
                    visible: true,
                    onClick: event => {
                      const ordem = { id: event.target.id, cliente: 'Editado' };
                      editarOrdem(ordem)
                        .then(ordem => {
                          this.updateOrdens();
                          console.log('Ordem Editada');
                        })
                        .catch(erro => {
                          console.log('Erro ao editar Ordem');
                        })
                    }
                  },
                  {
                    labelText: 'excluir',
                    header: 'Excluir',
                    visible: true,
                    onClick: event => {
                      const ordem = { id: event.target.id };
                      excluirOrdem(ordem)
                        .then(ordem => {
                          this.updateOrdens();
                          console.log('Ordem Excluida');
                        })
                        .catch(erro => {
                          console.log(`Erro ao excluir Ordem`);
                        })
                    }
                  },
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

OrdemDeServico.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(OrdemDeServico);
