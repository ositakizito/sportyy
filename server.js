import express from "express";
import mysql from "mysql"
import cors from "cors"

const app = express();
app.use(cors());
app.use(express.json())
const db = mysql.createConnection({
    host: "bk0u0hrxflkhgoznsgby-mysql.services.clever-cloud.com",
    user: "uhaevftyhfml5dos",
    password: "eWA4xClN9MZasWAxShaS",
    database: "bk0u0hrxflkhgoznsgby"
})

app.get('/', (req, res) => {
    const sql = "SELECT * FROM ticket";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    })
})

app.post('/ticket', (req, res) => {
    const sql = "INSERT INTO ticket (`TicketID`, `Date`,`Time`,`TotalStake`,`TotalOdds`,`MaxBonus`,`PotWin`,`BookingCode`,`GameID`,`GameTime1`,`TeamName1`,`TeamName2`,`FTScore1`,`Odds1`,`GameID2`,`GameTime2`,`TeamName3`,`TeamName4`,`FTScore2`,`Odds2`) VALUES (?)";
    console.log(req.body);
    const vlaues = [
        req.body.ticket,
        req.body.date,
        req.body.time,
        req.body.totalstake,
        req.body.totalodds,
        req.body.maxbonus,
        req.body.potwin,
        req.body.booking,
        req.body.gameid1,
        req.body.gametime1,
        req.body.team1,
        req.body.team2,
        req.body.ftscore1,
        req.body.odds1,
        req.body.gameid2,
        req.body.gametime2,
        req.body.team3,
        req.body.team4,
        req.body.ftscore2,
        req.body.odds2
    ]
    db.query(sql, [vlaues], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
})

app.get('/run/:id', (req, res) => {
    const sql = "SELECT * FROM ticket WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    })
})
app.get('/won/:id', (req, res) => {
    const sql = "SELECT * FROM ticket WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    })
})

app.delete("/delete/:id", (req, res) => {
    const sql = "DELETE FROM ticket WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    })
})

app.put("/edit/:id", (req, res) => {
    const sql = "UPDATE ticket SET `TicketID`=?, `Date`=?, `Time`=?,`TotalStake`=?,`TotalOdds`=?,`MaxBonus`=?,`PotWin`=?,`BookingCode`=?,`GameID`=?,`GameTime1`=?,`TeamName1`=?,`TeamName2`=?,`FTScore1`=?,`Odds1`=?,`GameID2`=?,`GameTime2`=?,`TeamName3`=?,`TeamName4`=?,`FTScore2`=?,`Odds2`=?";
    const id = req.params.id;
    db.query(sql, [req.body.ticket,
    req.body.date,
    req.body.time,
    req.body.totalstake,
    req.body.totalodds,
    req.body.maxbonus,
    req.body.potwin,
    req.body.booking,
    req.body.gameid1,
    req.body.gametime1,
    req.body.team1,
    req.body.team2,
    req.body.ftscore1,
    req.body.odds1,
    req.body.gameid2,
    req.body.gametime2,
    req.body.team3,
    req.body.team4,
    req.body.ftscore2,
    req.body.odds2, id], (err, result)=>{
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    })
})

app.listen(3306, () => {
    console.log("Listening")
})