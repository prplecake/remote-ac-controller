import React, {useEffect, useState} from "react";
import {fetchHistoricalSensorData} from "../api/remote-ac";
import {convertToFahrenheit, formatDate} from "./remote-ac";
import {useRefresh} from "../hooks/useRefresh";
import {DhtSensorData} from "../types/DhtSensorData";
import {Button, Col, Row} from "reactstrap";

interface HistoricalDataApiResponse {
  count: number | null,
  next: string | null,
  previous: string | null,
  results: Array<DhtSensorData> | null,
}

export function HistoricalSensorData() {
  const [data, setData] = useState<HistoricalDataApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchData = () => {
    fetchHistoricalSensorData(page).then((result) => {
      setData(result);
    });
  }

  useEffect(() => {
    if (data !== null) {
      setIsLoading(false);
    } else {
      fetchData();
    }
  }, [data]);

  useEffect(() => {
    fetchData();
  }, [page])

  useRefresh(fetchData);

  return (
    <>
      {isLoading ? (
        <p>Loading historical data...</p>
      ) : (<>
          {data!.results!.map((item, i) => (
            <p key={i}>
              {formatDate(new Date(item.date))} ::{" "}
              {convertToFahrenheit(item.temp_c)}&deg;F ({item.temp_c}&deg;C)
              H: {item.humidity}%
            </p>
          ))}
          <Row>
            {/* Earlier/Next button */}
            <Col>
              {page < (Math.ceil(data!.count! / 20)) ? (
                <>
                <Button
                  color={"secondary"}
                  onClick={() => setPage(Math.ceil(data!.count! / 20))}
                  size={"sm"}
                  >
                  <i className="bi bi-chevron-double-left"></i>
                </Button>&nbsp;
                </>
              ):null}
              {data?.next !== null ? (
                <Button
                  color='secondary'
                  onClick={() => setPage(page + 1)}
                  size={"sm"}
                >
                  <i className="bi bi-chevron-left"></i>
                </Button>
              ) : null}
            </Col>
            {/* Later/Previous button */}
            <Col>
              {data?.previous !== null ? (
                <Button
                  color={"secondary"}
                  onClick={() => setPage(page - 1)}
                  size={"sm"}
                >
                  <i className="bi bi-chevron-right"></i>
                </Button>
              ) : null}
              {page > 2 ? (
               <>
               &nbsp;<Button
                  color={"secondary"}
                  onClick={() => setPage(1)}
                  size={"sm"}
                  >
                  <i className="bi bi-chevron-double-right"></i>
                </Button>
               </>
              ):null}
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
