import React, { Component } from 'react';
import '../assets/css/App.css';
import { Table, TableRow, TableCell, TableBody, TableHead, CardContent, Card, Grid, TextField} from '@material-ui/core';
import { Creators as ItemActions } from "../redux/reducers/Items";
import {connect} from "react-redux";
import {Formik} from 'formik';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DelIcon from '@material-ui/icons/Delete';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
});

class ShoppingList extends Component {
    render() {
        const {items, classes, onTableAdd} = this.props;
        return (
            <Grid>
                <Card>
                    <CardContent>
                        <Formik
                            initialValues={{item: '', unit: 'l', quantity: 0}}
                            onSubmit={(values, actions) => {
                                let data = new FormData();
                                for(let [key, val] of Object.entries(values)){
                                    data.append(key, val);
                                }
                                onTableAdd(data);
                            }}
                            render={(formikprops)=>(
                                <form onSubmit={formikprops.handleSubmit}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Item</TableCell>
                                                <TableCell numeric>Quantity</TableCell>
                                                <TableCell>Unit</TableCell>
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {items.map(row => {
                                                return (
                                                    <TableRow key={row.id}>
                                                        <TableCell>{row.item}</TableCell>
                                                        <TableCell numeric>{row.quantity}</TableCell>
                                                        <TableCell>{row.unit}</TableCell>
                                                        <TableCell><IconButton type={"submit"}><DelIcon/></IconButton></TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                            <TableRow>
                                                <TableCell>
                                                    <TextField
                                                        id="item"
                                                        label="Item"
                                                        className={classes.textField}
                                                        onChange={formikprops.handleChange}
                                                        onBlur={formikprops.handleBlur}
                                                        margin="normal"
                                                        value={formikprops.values.item}
                                                        variant="outlined"/>
                                                </TableCell>
                                                <TableCell numeric>
                                                    <TextField
                                                        id="quantity"
                                                        label="quantity"
                                                        onChange={formikprops.handleChange}
                                                        onBlur={formikprops.handleBlur}
                                                        className={classes.textField}
                                                        margin="normal"
                                                        value={formikprops.values.quantity}
                                                        variant="outlined"/>
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        id="unit"
                                                        name={"unit"}
                                                        label="unit"
                                                        className={classes.textField}
                                                        margin="normal"
                                                        onChange={formikprops.handleChange}
                                                        onBlur={formikprops.handleBlur}
                                                        value={formikprops.values.unit}
                                                        variant="outlined"/>

                                                </TableCell>
                                                <TableCell>
                                                    <IconButton type={"submit"}>
                                                        <AddIcon/>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </form>
                            )}
                        />
                    </CardContent>
                </Card>
            </Grid>
        );
    }
    componentDidMount () {
        const {onTableLoad} = this.props;
        onTableLoad();
    }
}

const mapStateToProps = state => {
    return {
        items: state.Items.items
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTableLoad: () =>
            dispatch(ItemActions.get_items_request()),
        onTableAdd: (data) => {
            dispatch(ItemActions.create_item_request(data));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ShoppingList));