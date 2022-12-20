
import {Box, Button, Paper, Typography} from "@mui/material";
import Option from "../../../../shared/models/Option";
import {Link} from "react-router-dom";

interface Props {
  option: Option
}

const CardModule = ({option}: Props) => {
  return (
    <Paper elevation={5} style={{width: "max(30%, 310px)", minHeight: "210px", display: "flex", gap: "0 15px"}} >
      <img style={{width: "45%", objectFit: "cover", borderRadius: "4px 0 0 4px"}} src={option.image} alt={option.title} />
      <Box padding={1} width="45%">
        <Typography variant="h3" fontWeight="bold">{option.title}</Typography>
        <p>{option.description}</p>
        <Button component={Link} to={option.link}>Ver más</Button>
      </Box>
    </Paper>
  );
};

export default CardModule;