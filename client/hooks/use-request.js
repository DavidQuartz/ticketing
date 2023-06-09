import axios from 'axios';
import { useState } from 'react';

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <ul className="my-0">
            {err.response?.data?.errors ? (
              err.response.data.errors.map((error, id) => (
                <li className="list" key={id}>
                  {error.message}
                </li>
              ))
            ) : (
              <li className="list">{err.message}</li>
            )}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
