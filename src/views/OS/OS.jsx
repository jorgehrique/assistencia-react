import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomSelect from "components/CustomSelect/CustomSelect.jsx";
import Button from "components/CustomButtons/Button.jsx";

import {
  buscarOrdens, buscarCabecalho, buscarTipoOrdens, salvarOrdem,
  editarOrdem, excluirOrdem
}
  from "../../services/OSService";

import { EventEmitter } from "events";

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
      ordens: [],
      cabecalho: [],
      tipoOrdens: [],
      form: {},
    }
  }

  salvarOnClick = () => {
    salvarOrdem(this.state.form)
      .then(ordem => {
        this.updateOrdens();
      })
      .then(() => {
        // notificacao de sucesso
        console.log("Ordem inserida com sucesso");
      })
      .catch(() => {
        // notificacao de erro
        console.log("Erro ao salvar ordem");
      })
  }

  updateOrdens = () => {
    buscarOrdens()
      .then(ordens => {
        this.setState({ ordens });
      })
      .catch(erro => {
        console.log(`Erro ao atualizar a tabela de ordens`);
      });
  }

  updateFormState = event => {
    let form = this.state.form;
    form[event.target.id] = event.target.value;
    this.setState({ form });
  }

  componentDidMount() {
    this.updateOrdens();

    buscarCabecalho()
      .then(cabecalho => {
        this.setState({ cabecalho });
      })
      .catch(erro => {
        console.log('Erro ao buscar cabecalho');
      });

    buscarTipoOrdens()
      .then(tipoOrdens => {
        const tipos = tipoOrdens.map(e => { return { label: e, value: e } });
        this.setState({ tipoOrdens: tipos });
      })
      .catch(erro => {
        console.log('Erro ao buscar tipos de ordens');
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Criar</h4>
              <p className={classes.cardCategoryWhite}>Complete a ordem de serviço</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Cliente"
                    id="cliente"
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
                      onChange: this.updateFormState
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
                  <Button color="primary" onClick={this.salvarOnClick}>Salvar</Button>
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
