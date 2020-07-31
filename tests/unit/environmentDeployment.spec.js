import {expect} from "chai";
import {shallowMount} from '@vue/test-utils'
import EnvironmentDeployment from "@/components/EnvironmentDeployment";

describe('EnvironmentDeployment', () => {
    it('renders a date as readable', () => {
        const wrapper = shallowMount(EnvironmentDeployment, {
            propsData: {
                deployedAt: '',
                triggererIcon: ''
            }
        });

        expect(wrapper.vm.readableDate(0)).to.equal('Thu, Jan 1, 1970 12:00 AM');
        expect(wrapper.vm.readableDate(1582901700000)).to.equal('Fri, Feb 28, 2020 2:55 PM')
    });
});
