
export default async function createGrafanaDashboard(
    metrix,
    datasource,
) {
    // create dashboard object boilerplate
    const dashboard = {
        "dashboard": {
            "id": null,
            "uid": metrix.id,
            "title": metrix.name,
            "tags": ["templated"],
            "timezone": "browser",
            "schemaVersion": 16,
            "version": 0,
            "refresh": "10s",
            panels: [],
        },
        folderId: 0,
        overwrite: true,
    };


    // push panel into dashboard object with a line for each metric in promQLQueries object
    dashboard.dashboard.panels.push(createGrafanaPanelObject(metrix, datasource));

    try {
        // POST request to Grafana Dashboard API to create a dashboard
        const dashboardResponse = await axios.post(
            'http://localhost:32000/api/dashboards/db',
            JSON.stringify(dashboard),
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        // Descriptive error log for developers
        if (dashboardResponse.status >= 400) {
            console.log(
                'Error with POST request to Grafana Dashboards API. In createGrafanaDashboardObject.'
            );
        } else {
            // A simple console log to show when graphs are done being posted to Grafana.
            console.log(`📊 Grafana graphs 📊 for the ${containerName} container are ready!!`);
        }
    } catch (err) {
        console.log(err);
    }
}