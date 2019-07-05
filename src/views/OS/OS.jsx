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

function OrdemDeServico(props) {
  const { classes } = props;
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Ordem de Serviços</h4>
            <p className={classes.cardCategoryWhite}></p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["#", "Cliente", "Aparelho", "Ordem", "Data"]}
              tableData={[
                ["asdasdasde", "Niger", "Oud-Turnhout", "$36,738", "asdas"],
                ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789", "asdas"],
                ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142", "asdas"],
                ["Philip Chaney", "Korea, South", "Overland Park", "$38,735", "asdas"],
                ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542", "asdas"],
                ["Mason Porter", "Chile", "Gloucester", "$78,615", "asdas"]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

OrdemDeServico.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(OrdemDeServico);
