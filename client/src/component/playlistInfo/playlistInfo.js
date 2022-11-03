import React, { useState } from "react";

import "./PlaylistInfo.css";

import axios from "axios";

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
/* Component for the playlist info */
function PlaylistInfo(props) {

    const resultFound = props.resultFound
    const playlistInfo = props.playlistInfo
    const [showMore, setShowMore] = useState(false)
    const [sortBy, setSortBy] = React.useState('');
    const [curList,setCurList]= useState(playlistInfo)

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    }));

    const showmore=()=>{
        setShowMore(true)
    }
    const showLess=()=>{
        setShowMore(false)
    }

    const handleChange = (event) => {
        setSortBy(event.target.value);
      };

    return (
        <div>
            {resultFound ? (
                <div>
                <h1 id="title">Playlist Info</h1>

                <Box sx={{ width: "30%" , ml:"15%", marginBottom:"10px"}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Sort By"
                        value={sortBy}
                        onChange={handleChange}
                        >
                        <MenuItem value={1}>Video Number: high to low</MenuItem>
                        <MenuItem value={2}>Video Number: low to high</MenuItem>
                        <MenuItem value={3}>Published Time: latest to earlist</MenuItem>
                        <MenuItem value={4}>Published Time: earlist to latest</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <TableContainer component={Paper}>
                <Table sx={{ maxWidth: "80%",ml:"10%", marginBottom:"30px"}} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Playlist Title</StyledTableCell>
                        <StyledTableCell>Description</StyledTableCell>
                        <StyledTableCell>Video Number</StyledTableCell>
                        <StyledTableCell >Published At</StyledTableCell>
                    </TableRow>
                    </TableHead>
                        {showMore ? (<TableBody>
                            {playlistInfo.map((playlist) => (
                                <StyledTableRow key={playlist.snippet.title}>
                                <StyledTableCell component="th" scope="row">
                                    {playlist.snippet.title}
                                </StyledTableCell>
                                <StyledTableCell>{playlist.snippet.localized.description}</StyledTableCell>
                                <StyledTableCell>{playlist.contentDetails.itemCount}</StyledTableCell>
                                <StyledTableCell>{playlist.snippet.publishedAt.substring(0,10)+" "+playlist.snippet.publishedAt.substring(11,19)}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row"></StyledTableCell>
                                <StyledTableCell id="showMore" align="center" onClick={()=>showLess()}>Show less...</StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                </StyledTableRow>
                        </TableBody>)
                        :(<TableBody>
                            {playlistInfo.slice(0,6).map((playlist) => (
                                <StyledTableRow key={playlist.snippet.title}>
                                <StyledTableCell component="th" scope="row">
                                    {playlist.snippet.title}
                                </StyledTableCell>
                                <StyledTableCell>{playlist.snippet.localized.description}</StyledTableCell>
                                <StyledTableCell>{playlist.contentDetails.itemCount}</StyledTableCell>
                                <StyledTableCell>{playlist.snippet.publishedAt.substring(0,10)+" "+playlist.snippet.publishedAt.substring(11,19)}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row"></StyledTableCell>
                                <StyledTableCell id="showMore" align="center" onClick={()=>showmore()}>Show more...</StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                </StyledTableRow>
                        </TableBody>)
                        }
                    
                </Table>
                </TableContainer>
                </div>
            )
            :null}
        </div>)
}

export default PlaylistInfo;
