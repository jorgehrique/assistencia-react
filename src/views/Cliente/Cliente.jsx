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

class Cliente extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      extraTelefoneFields: 2,
      form: {}
    };
  }

  componentDidMount() {

  }

  renderExtraTelefoneField() {
    let fields;
    for (let i = 0; this.state.extraTelefoneFields; i++) {
      fields += (
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText="Telefone"
              id={"telefone" + i}
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
        </GridContainer>
      )
    }
    return fields;
  }


  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
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
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="CPF"
                    id="cpf"
                    formControlProps={{
                      fullWidth: true
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
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Bairro"
                    id="bairro"
                    formControlProps={{
                      fullWidth: true
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
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Telefone"
                    id="telefone"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                  <span>Add</span>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Button color="primary">Salvar</Button>
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
              <Table
                tableHeaderColor="primary"
                tableHead={[]}
                tableData={[]}
                tableActions={[]}
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
