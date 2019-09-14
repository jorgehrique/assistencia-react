import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import OSTable from "components/Table/OSTable.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomSelect from "components/CustomSelect/CustomSelect.jsx";
import Button from "components/CustomButtons/Button.jsx";
import ClienteInput from "components/CustomInput/AutoCompleteInput";

import { buscarClientes } from "../../services/ClienteService";
import { logError, logObject } from "../../utils/Debug";
import { dateToString } from "../../utils/FormatConverter";

import {
  buscarOrdens, buscarCabecalho, buscarTipoOrdens, buscarPdfPorId,
  salvarOrdem, buscarOrdemPorId, editarOrdem, excluirOrdem
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
      form: { cliente: { id: 0 } },
      notification: {},
      clientesAutoComplete: []
    }
  }

  salvarHandle = () => {
    logObject('salvarHandle', this.state.form);
    salvarOrdem(this.state.form)
      .then(ordem => {
        this.notification(`Ordem #${ordem.id} foi salva`, 'success');
        this.updateOrdens();
      })
      .catch(error => {
        this.notification('Erro ao salvar ordem', 'danger');
        logError('salvarOrdem', error);
      })
  }

  editarHandle = id => {
    buscarOrdemPorId(id)
      .then(ordem => {
        this.setState({
          form: {
            ...ordem,
            imei1: ordem.imei[0],
            imei2: ordem.imei[1],
          }
        });

        logObject('buscarOrdemPorId', this.state.form);
      })
      .catch(error => {
        this.notification('Erro ao editar ordem', 'danger');
        logError('buscarOrdemPorId', error);
      });
  }

  deleteHandle = id => {
    excluirOrdem(id)
      .then(() => {
        this.notification(`Ordem excluida`, 'success');
        this.updateOrdens();
      })
      .catch(error => {
        this.notification('Erro ao excluir ordem', 'danger');
        logError('excluirOrdem', error);
      })
  }

  printHandle = id => {
    buscarPdfPorId(id)
      .then(resp => resp.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `ordem_de_servico_${id}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch(error => {
        logError('printHandle', error);
      });
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
              data: dateToString(os.dataCriacao)
            })
          });
          this.setState({ ordens });
        })
        .catch(error => {
          this.notification('Erro ao atualizar a tabela de ordens', 'danger');
          logError('buscarOrdens', error);
        });
    }

    changeHandle = field => e => {
      const { form } = this.state;
      this.setState({ form: { ...form, [field]: e.target.value } });
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
        .catch(error => {
          this.notification('Erro ao buscar cabeçalho', 'danger');
          logError('buscarCabecalho', error)
        });

      buscarTipoOrdens()
        .then(tipoOrdens => {
          const tipos = tipoOrdens.map(e => { return { label: e, value: e } });
          this.setState({ tipoOrdens: tipos });
        })
        .catch(error => {
          this.notification('Erro ao buscar os tipos de ordens', 'danger');
          logError('buscarTipoOrdens', error)
        });

      buscarClientes()
        .then(response => {
          const { content } = response;
          const clientesAutoComplete = content.map(c => {
            return { label: c.nome }
          });
          this.setState({ clientesAutoComplete });
        })
        .catch(error => logError('buscarClientes', error));
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
                      getId={id => {
                        const { form } = this.state;
                        form.cliente.id = id;
                        this.setState({ form });
                      }}
                      formControlProps={{
                        fullWidth: true
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
                        onChange: this.changeHandle('aparelho'),
                        value: this.state.form.aparelho
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
                        onChange: this.changeHandle('tipoOrdem'),
                        value: this.state.form.tipoOrdem
                      }}
                      items={this.state.tipoOrdens}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Descriçâo do problema"
                      id="descricao"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: this.changeHandle('descricao'),
                        value: this.state.form.descricao
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
                        onChange: this.changeHandle('laudo'),
                        value: this.state.form.laudo
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
                        onChange: this.changeHandle('observacao'),
                        value: this.state.form.observacao
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
                        onChange: this.changeHandle('imei1'),
                        value: this.state.form.imei1
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
                        onChange: this.changeHandle('imei2'),
                        value: this.state.form.imei2
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
                      inputProps={{
                        onChange: this.changeHandle('precoBruto'),
                        value: this.state.form.precoBruto
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
                      inputProps={{
                        onChange: this.changeHandle('desconto'),
                        value: this.state.form.desconto
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
                      inputProps={{
                        onChange: this.changeHandle('preco'),
                        value: this.state.form.preco
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
                <OSTable
                  tableHeaderColor="primary"
                  tableHead={this.state.cabecalho}
                  tableData={this.state.ordens}
                  actions={
                    {
                      onPrint: this.printHandle,
                      onEdit: this.editarHandle,
                      onDelete: this.deleteHandle,
                    }
                  }
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer >
      );
    }
  }

  OrdemDeServico.propTypes = {
    classes: PropTypes.object
  };

  export default withStyles(styles)(OrdemDeServico);
