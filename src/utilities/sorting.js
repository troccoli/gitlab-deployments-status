export function sortProjects(allProjects, starredProjects) {
    let starred = starredProjects.map(project => {
        return project.name_with_namespace;
    });

    return allProjects.sort(function (a, b) {
        if (starred.includes(a.name_with_namespace) && !starred.includes(b.name_with_namespace)) {
            return -1;
        }
        if (!starred.includes(a.name_with_namespace) && starred.includes(b.name_with_namespace)) {
            return 1;
        }

        if (a.name_with_namespace < b.name_with_namespace) {
            return -1;
        } else if (a.name_with_namespace > b.name_with_namespace) {
            return 1;
        }
        return 0;
    });
}
