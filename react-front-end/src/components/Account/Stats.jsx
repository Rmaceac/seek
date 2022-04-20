import { Card, CardContent, Typography, CardActions, CardHeader, Button } from '@mui/material'

const Stats = () => {
  return (
    <Card className='profile-card-contents' sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h4">
          Stats
        </Typography>
        <ul className='info-card'>
          <dt><strong>Total Score</strong></dt>
          <dd>15934</dd>
          <dt><strong>Games Played</strong></dt>
          <dd>9</dd>
          <dt><strong>Last Game Score</strong></dt>
          <dd>3789</dd>
          <dt><strong>Last Week Score</strong></dt>
          <dd>6192</dd>
          <dt><strong>Highest Streak</strong></dt>
          <dd>5</dd>
        </ul>
      </CardContent>
      <CardActions>
        <Button size="small">Share Scores</Button>
      </CardActions>
    </Card>
  );
}

export default Stats;
